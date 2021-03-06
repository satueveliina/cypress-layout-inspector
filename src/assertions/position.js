import Rect from '../utils/rect';

export default _chai => {
    function rightOf(element, distance = 0) {
        const [source, target] = [new Rect(this._obj), new Rect(element)];
        const actual = source.left - target.right;

        if (distance === 0) {
            return this.assert(
                actual >= 0,
                `expected #{this} to be right of ${element}`,
                `expected #{this} not to be right of ${element}`
            );
        }

        return this.assert(
            actual === distance,
            `expected #{this} to be right of ${element} by #{exp}, but the value was #{act}`,
            `expected #{this} not to be right of ${element} by #{exp}, but the value was #{act}`,
            distance,
            actual
        );
    }

    function leftOf(element, distance = 0) {
        const [source, target] = [new Rect(this._obj), new Rect(element)];
        const actual = target.left - source.right;

        if (distance === 0) {
            return this.assert(
                actual >= 0,
                `expected #{this} to be left of ${element}`,
                `expected #{this} not to be left of ${element}`
            );
        }

        return this.assert(
            actual === distance,
            `expected #{this} to be left of ${element} by #{exp}, but the value was #{act}`,
            `expected #{this} not to be left of ${element} by #{exp}, but the value was #{act}`,
            distance,
            actual
        );
    }

    _chai.Assertion.addMethod('rightOf', rightOf);
    _chai.Assertion.addMethod('leftOf', leftOf);

    _chai.Assertion.overwriteMethod('above', _super => {
        return function (element, distance = 0) {
            if (this._obj.constructor.name === 'jQuery') {
                const [source, target] = [
                    new Rect(this._obj),
                    new Rect(element),
                ];
                const actual = target.top - source.bottom;

                if (distance === 0) {
                    return this.assert(
                        actual >= 0,
                        `expected #{this} to be above ${element}`,
                        `expected #{this} not to be above ${element}`
                    );
                }

                return this.assert(
                    actual === distance,
                    `expected #{this} to be above ${element} by #{exp}, but the value was #{act}`,
                    `expected #{this} not to be above ${element} by #{exp}, but the value was #{act}`,
                    distance,
                    actual
                );
            }

            return _super.apply(this, arguments);
        };
    });

    _chai.Assertion.overwriteMethod('below', _super => {
        return function (element, distance = 0) {
            if (this._obj.constructor.name === 'jQuery') {
                const [source, target] = [
                    new Rect(this._obj),
                    new Rect(element),
                ];
                const actual = source.top - target.bottom;

                if (distance === 0) {
                    return this.assert(
                        actual >= 0,
                        `expected #{this} to be below ${element}`,
                        `expected #{this} not to be below ${element}`
                    );
                }

                return this.assert(
                    actual === distance,
                    `expected #{this} to be below ${element} by #{exp}, but the value was #{act}`,
                    `expected #{this} not to be below ${element} by #{exp}, but the value was #{act}`,
                    distance,
                    actual
                );
            }

            return _super.apply(this, arguments);
        };
    });
};
