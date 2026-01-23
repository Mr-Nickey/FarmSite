routerAdd("POST", "/api/contact", (c) => {
    const data = $apis.requestInfo(c).data || {};

    // 1. Validate
    if (!data.email || !data.message) {
        return c.json(400, { message: "Email and message are required." });
    }

    // 2. Send Email
    const settings = $app.settings();
    const senderAddress = settings.meta.senderAddress || "noreply@flockingreeds.farm";
    const senderName = settings.meta.senderName || "Farm Bot";

    try {
        const email = new Mail({
            to:      [{ address: "admin@flockingreeds.farm" }],
            from:    { address: senderAddress, name: senderName },
            subject: `New Farm Contact: ${data.subject || 'No Subject'}`,
            html:    `
                <h3>New Message from ${data.name || 'Unknown'}</h3>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
                <hr>
                <p>${data.message}</p>
            `
        });

        $app.newMailClient().send(email);
    } catch (err) {
        // Return error to client immediately so they know it failed
        return c.json(500, { message: "Failed to send email: " + err.message });
    }

    // 3. Save to Database (History)
    try {
        const collection = $app.dao().findCollectionByNameOrId("messages");
        const record = new Record(collection);
        record.set("name", data.name);
        record.set("email", data.email);
        record.set("subject", data.subject);
        record.set("body", data.message);
        $app.dao().saveRecord(record);
    } catch (err) {
        console.error("Failed to save message to DB:", err);
    }

    return c.json(200, { message: "Message sent successfully!" });
});