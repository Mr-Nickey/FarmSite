/**
 * This hook is triggered before serving a request.
 * It's used to add a CORS middleware to allow requests from the local development server.
 */
onBeforeServe((e) => {
    // add a middleware to handle CORS
    e.router.use((c, next) => {
        c.res.setHeader('Access-Control-Allow-Origin', '*')

        c.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        c.res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        if (c.req.method === 'OPTIONS') {
            return c.json(204, {})
        }

        // pass the request to the next middleware
        return next()
    })
})

onRecordAfterDeleteRequest((e) => {
    console.log("Newsletter deletion hook triggered.");

    const deletedNewsletter = e.record;
    const subject = deletedNewsletter.get("subject");
    const body = deletedNewsletter.get("body");

    try {
        const records = $app.dao().findRecordsByFilter(
            "sent_newsletters",
            "subject = {:subject} && body = {:body}",
            "",
            0,
            0,
            {
                subject: subject,
                body: body
            }
        );

        records.forEach(record => {
            $app.dao().deleteRecord(record);
            console.log(`Deleted sent_newsletter record with ID: ${record.getId()}`);
        });

    } catch (err) {
        console.error("Error deleting sent_newsletter records:", err);
    }
}, "newsletters");

/**
 * PocketBase hook to recalculate and sync the 'Feed and Supply' goal target
 * whenever a ledger item is created, updated, or deleted.
 *
 * This hook ensures that the feed goal always reflects the total expenses for the current month.
 */
function handleLedgerChange(e) {
  console.log(`Ledger hook triggered by ${e.httpContext.method} on collection: ${e.collection.name}`);

  // Determine the month and year to recalculate.
  // We'll base this on the date of the record that was just changed.
  const record = e.record;
  let recordDate;

  // For DELETE requests, the record data is not in e.record.
  // A robust solution would be to trigger a recalculation for the *current* month
  // as a fallback, though this may not cover all edge cases (e.g., bulk-deleting old records).
  // For now, we'll focus on create/update and the current month for deletes.
  if (record && record.get("date")) {
    // Dates from the frontend come in as 'YYYY-MM-DD', so we need to ensure they are parsed correctly.
    // Appending T00:00:00Z makes it a UTC date.
    recordDate = new Date(record.get("date").split(" ")[0] + "T00:00:00Z");
  } else {
    recordDate = new Date(); // Fallback to current date for deletions or records without a date
  }

  // Ensure recordDate is valid before proceeding
  if (isNaN(recordDate.getTime())) {
    console.error("Could not determine a valid date for recalculation. Aborting hook.");
    return;
  }

  const year = recordDate.getUTCFullYear();
  const month = recordDate.getUTCMonth(); // 0-indexed

  // First day of the month (UTC)
  const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0)).toISOString();
  // Last moment of the last day of the month (UTC)
  const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999)).toISOString();

  console.log(`Recalculating totals for month ${year}-${String(month + 1).padStart(2, '0')}`);

  let totalExpenses = 0;
  try {
    // Find all 'expense' type ledger items for the determined month
    const records = $app.dao().findRecordsByFilter(
      "ledger",
      "date >= {:startDate} && date <= {:endDate} && type = 'expense'",
      "-date", // sort order
      0,       // limit
      0,       // offset
      {
        startDate: startDate,
        endDate: endDate
      }
    );

    // Sum the 'amount' for all found records
    records.forEach(rec => {
      totalExpenses += rec.get("amount");
    });

    // Round to 2 decimal places to avoid floating point issues
    totalExpenses = parseFloat(totalExpenses.toFixed(2));
    console.log(`Total expenses for the month: ${totalExpenses}`);

  } catch (err) {
    console.error("Error calculating total expenses:", err);
    // It might be safer to stop execution if we can't get an accurate total
    return;
  }

  try {
    // Find the 'Feed and Supply' goal record.
    const goal = $app.dao().findFirstRecordByFilter(
      "goals",
      "name = 'Feed and Supply'"
    );

    if (goal) {
      const currentTarget = parseFloat(goal.get("target").toFixed(2));
      console.log(`Found goal "Feed and Supply" (ID: ${goal.getId()}). Current target: ${currentTarget}`);
      
      // Only save if the value has changed to avoid unnecessary writes/hook triggers
      if (currentTarget !== totalExpenses) {
        goal.set("target", totalExpenses);
        $app.dao().saveRecord(goal);
        console.log(`Updated "Feed and Supply" goal target to: ${totalExpenses}`);
      } else {
        console.log("Goal target is already up-to-date. No action taken.");
      }
    } else {
      console.warn("Could not find a goal with name 'Feed and Supply'.");
    }
  } catch (err) {
    console.error("Error updating the 'goals' collection:", err);
  }
}

// Register the hook for all relevant events on the 'ledger' collection.
onRecordAfterCreateRequest(handleLedgerChange, "ledger");
onRecordAfterUpdateRequest(handleLedgerChange, "ledger");
onRecordAfterDeleteRequest(handleLedgerChange, "ledger");