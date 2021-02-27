export default class ClientApi {
    constructor(ajaxClient) {
        this.ajaxClient = ajaxClient;
    }
    async getList() {
        return await this.ajaxClient.get('http://localhost:3000/api/game-list/')
    }
}
