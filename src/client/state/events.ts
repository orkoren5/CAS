type Handler = (...args: any) => void;

// interface Event {
//     on: (handler: Handler) => void;
//     emit: (...args: any) => void;
// }

export class Signal {
    handlers: Array<Handler> = [];

    on(handler: Handler) {
        if (typeof handler === "function") {
            this.handlers.push(handler);
        }
        else {
            console.error("Handler is not a function!");
        }
    }

    remove(handler: Handler) {
        const index = this.handlers.findIndex(h => h === handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    emit(...args: any) {
        this.handlers.forEach(handler => handler(...args));
    }
}