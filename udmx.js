var usb = require('usb');
var events = require('events');

function DMX(options) {
    var defaults = {
        vendor: 0x16c0,
        device: 0x5dc
    };

    for(var opt in defaults) {
        if(!defaults.hasOwnProperty(opt)) continue;
        this[opt] = options && options.hasOwnProperty(opt) ? options[opt] : defaults[opt];
    }

    this.connected = false;
    this.state = {}
}

DMX.prototype.__proto__ = events.EventEmitter.prototype;

DMX.prototype.connect = function() {
    this.dev = usb.findByIds(this.vendor, this.device);
    if(this.dev === undefined) {
       throw 'Unable to find USB device!';
    }

   this.dev.open();
   this.emit('connected');
}

DMX.prototype.set = function(channel, value) {
    var self = this;
    return new Promise((resolve, reject) => {
        this.dev.controlTransfer(64, 1, value, channel-1, Buffer(1), function(err, result) {
            if(err) {
                reject(err);
            } else {
                self.emit('channel-' + channel, value);
                self.emit('channel-all', channel, value);
                self.state[channel] = value;
                resolve(result);
            }
        });
    });
}

DMX.prototype.setChannels = function(bytes, offset = 0) {
    var self = this;
    return new Promise((resolve, reject) => {
        this.dev.controlTransfer(64, 2, bytes.length, offset, Buffer.from(bytes), function(err, result) {
            if(err) {
                reject(err);
            } else {
                // self.emit('channel-' + channel, value);
                // self.emit('channel-all', channel, value);
                // self.emit('all-all', channel, value);
                // self.state[channel] = value;
                resolve(result);
            }
        });
    });

}

DMX.prototype.get = function(channel) {
    return this.state[channel];
}

module.exports = DMX;
