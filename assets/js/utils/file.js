export default {
    methods: {
        uploadFile(acceptedTypes, callback) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = acceptedTypes;
            input.onchange = (event) => {
                const file = event.target.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onload = (readerEvent) => {
                        callback(readerEvent.target.result);
                    };
                    reader.readAsArrayBuffer(file);
                }
            };
            input.click();
        },
        downloadFile(filename, data, mimeType = 'application/octet-stream') {
            const blob = new Blob([data], { type: mimeType });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        },
    },
};
