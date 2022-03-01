const workercode = () => {
    function factorial(userInt) {
        if (userInt === 0)
            return '1'

        if (!userInt)
            return ''

        let i, nextNumber, carret,

            result = userInt.toString().split('').reverse().map(Number)

        while (--userInt) {
            i = carret = 0

            while ((nextNumber = result[i++]) !== undefined || carret) {
                carret = (nextNumber || 0) * userInt + carret
                result[i - 1] = carret % 10
                carret = parseInt(carret / 10)
            }
        }

        return result.reverse().join('')
    }
    onmessage = function (e) {
        console.log("on message: ", e.data);
        const { num } = e.data;
        const factNum = factorial(num);
        postMessage({
            factNum,
        });
    };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
