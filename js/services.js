// js/services.js

export class FarmService {
    static pb = null;

    static init(pocketbaseInstance) {
        FarmService.pb = pocketbaseInstance;
    }

    // Inventory
    static async getInventory() {
        return await FarmService.pb.collection('inventory').getFullList({ sort: '-created' });
    }

    static async updateInventoryItem(id, data) {
        return await FarmService.pb.collection('inventory').update(id, data);
    }

    static async createInventoryItem(data) {
        return await FarmService.pb.collection('inventory').create(data);
    }

    static async deleteInventoryItem(id) {
        return await FarmService.pb.collection('inventory').delete(id);
    }

    // Ledger
    static async getLedger() {
        return await FarmService.pb.collection('ledger').getFullList({ sort: '-date' });
    }

    static async createLedgerItem(data) {
        return await FarmService.pb.collection('ledger').create(data);
    }
    
    static async updateLedgerItem(id, data) {
        return await FarmService.pb.collection('ledger').update(id, data);
    }
    
    static async deleteLedgerItem(id) {
        return await FarmService.pb.collection('ledger').delete(id);
    }

    // Goals
    static async getGoals() {
        return await FarmService.pb.collection('goals').getFullList({ sort: 'created' });
    }

    static async createGoal(data) {
        return await FarmService.pb.collection('goals').create(data);
    }

    static async updateGoal(id, data) {
        return await FarmService.pb.collection('goals').update(id, data);
    }

    static async deleteGoal(id) {
        return await FarmService.pb.collection('goals').delete(id);
    }

    // Farm Status
    static async getFarmStatus() {
        // For simplicity, assuming a single record for farm status
        try {
            const record = await FarmService.pb.collection('farm_status').getFirstListItem('', { sort: "-created" });
            return record;
        } catch (err) {
            if (err.status === 404) return null; // Not found is okay
            throw err;
        }
    }

    static async createFarmStatus(data) {
        return await FarmService.pb.collection('farm_status').create(data);
    }

    static async updateFarmStatus(id, data) {
        return await FarmService.pb.collection('farm_status').update(id, data);
    }

    // Newsletters
    static async getNewsletters() {
        return await FarmService.pb.collection('newsletters').getFullList({ sort: '-created' });
    }

    static async createNewsletter(data) {
        return await FarmService.pb.collection('newsletters').create(data);
    }

    static async updateNewsletter(id, data) {
        return await FarmService.pb.collection('newsletters').update(id, data);
    }

    static async getSentNewsletters() {
        return await FarmService.pb.collection('sent_newsletters').getFullList({ sort: '-sent_at' });
    }

    static async sendNewsletter(id, subject, body) {
        const result = await FarmService.pb.send(`/api/newsletters/${id}/send`);
        
        // After sending, create a record in the sent_newsletters collection
        await FarmService.pb.collection('sent_newsletters').create({
            subject: subject,
            body: body,
            sent_at: new Date().toISOString(),
        });

        return result;
    }


    
    // Notes
    static async getNotes() {
        return await FarmService.pb.collection('notes').getFullList({ sort: '-created' });
    }

    static async createNote(data) {
        return await FarmService.pb.collection('notes').create(data);
    }

    static async updateNote(id, data) {
        return await FarmService.pb.collection('notes').update(id, data);
    }

    static async deleteNote(id) {
        return await FarmService.pb.collection('notes').delete(id);
    }

    // Assets
    static async getAssets() {
        return await FarmService.pb.collection('assets').getFullList({ sort: '-created' });
    }

    static async createAsset(data) {
        return await FarmService.pb.collection('assets').create(data);
    }

    static async updateAsset(id, data) {
        return await FarmService.pb.collection('assets').update(id, data);
    }

    static async deleteAsset(id) {
        return await FarmService.pb.collection('assets').delete(id);
    }

    // Shop Products
    static async getShopProducts() {
        return await FarmService.pb.collection('shop_products').getFullList({ sort: '+position' });
    }

    static async saveShopProduct(data, files) {
        // If there are no files, we can send a plain JS object, which handles data types correctly.
        if (!files || files.length === 0) {
            const recordData = { ...data };
            delete recordData.id; // Don't send the id in the body

            if (data.id) {
                return await FarmService.pb.collection('shop_products').update(data.id, recordData);
            } else {
                return await FarmService.pb.collection('shop_products').create(recordData);
            }
        }

        // If there are files, we must use FormData.
        const formData = new FormData();
        formData.append('Name', data.Name);
        formData.append('Description', data.Description);
        formData.append('Price', data.Price);
        formData.append('Stock_Qty', data.Stock_Qty);
        formData.append('position', data.position);
        formData.append('Category', data.Category);
        formData.append('published', data.published);
        formData.append('type', data.type);
        formData.append('stripe_link', data.stripe_link);
        formData.append('coming_soon', data.coming_soon);
        
        // Use the correct field name 'images' (lowercase)
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        if (data.id) {
            return await FarmService.pb.collection('shop_products').update(data.id, formData);
        } else {
            return await FarmService.pb.collection('shop_products').create(formData);
        }
    }

    static async deleteShopProduct(id) {
        return await FarmService.pb.collection('shop_products').delete(id);
    }

    // Monthly Archives
    static async getMonthlyArchives() {
        return await FarmService.pb.collection('monthly_archives').getFullList({ sort: '-created' });
    }

    static async deleteMonthlyArchive(id) {
        return await FarmService.pb.collection('monthly_archives').delete(id);
    }

    // Subscribers
    static async getSubscribers() {
        return await FarmService.pb.collection('subscribers').getFullList({ sort: '-created' });
    }


}