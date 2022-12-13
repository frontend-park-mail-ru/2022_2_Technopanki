import network from "../lib/network"
import { SERVER_URLS } from "../utils/networkConstants"

export const notificationService: {
    subscribe: (callback: (message: string) => void) => void
} = {
    subscribe: (callback: (message: string) => void): void => {
        network.WEBSOCKET(SERVER_URLS.NOTIFICATION, callback)
    }
}
