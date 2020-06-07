import $ from 'jquery';

class SharedLocalStorageIndex {

    constructor(element) {
        this.element = element;
    }

    register() {
        let self = this;
        self.onMessageReceived();
    }

    onMessageReceived() {
        let self = this;

        window.onmessage = (event) => {
            if (!self.isAllowedOrigin(event.origin)) {
                return;
            }

            self.processMessage(event.data);
        };
    }

    isAllowedOrigin(origin) {
        var self = this;
        return $("#shared-data", self.element).data("regexallowedurl").test(origin);
    }

    processMessage(data, origin) {
        let self = this;

        const payload = JSON.Parse(data);

        switch (payload.action) {
            case "SET":
                self.setData(payload);
            case "GET":
                self.getData(payload, origin);
        }
    }

    setData(payload) {
        localStorage.setItem(payload.key, JSON.stringify(payload.data));
    }

    getData(payload, origin) {
        let data = localStorage.getItem(payload.key);
        window.postMessage(data, origin);
    }
}

export default SharedLocalStorageIndex;