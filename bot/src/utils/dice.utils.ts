export type RollResult = {
    result: number,
    details: string
}

export default class DiceUtils {
    static parseDiceRoll(input: string): RollResult {
        input = input.replace(/\s/g, "");
        if (!input.match(/^(?:(?:\d*d)?\d+(?:e\d*)?[+\-\/*])*(?:\d*d)?\d+(?:e\d*)?$/i)) throw new Error("Invalid input");
        const entities = this.extractEntities(input);
        const operators = this.extractOperators(input);
        const values = [];
        const valuesDetails: (string | undefined)[] = [];

        for (const entity of entities) {
            const result = this.processEntity(entity, entities.length === 1);
            valuesDetails.push(result.details);
            values.push(result.value);
        }

        let total = values[0];
        let details = [valuesDetails[0]];

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const value = values[i + 1];
            const valueDetails = valuesDetails[i + 1];
            details.push(operator, valueDetails);
            switch (operator) {
                case "+":
                    total += value;
                    break;
                case "-":
                    total -= value;
                    break;
                case "*":
                    total *= value;
                    break;
                case "/":
                    total /= value;
                    break;
            }
        }
        details = details.filter(value => value !== undefined);
        return {result: total, details: details.join(" ")};
    }

    static extractEntities(input: string): string[] {
        return input.match(/((?:\d*d)?\d+(?:e\d*)?)/gi) || [];
    }

    static extractOperators(input: string): string[] {
        return input.match(/([+\-*\/])/g) || [];
    }

    static processEntity(input: string, isSingle: boolean): { value: number, details?: string } {
        if (input.match(/^\d+$/)) {
            return {value: parseInt(input), details: input};
        }

        const data = input.match(/(\d*)?d(\d+)(e(\d*))?/i) || [];
        const diceCount = data[1] ? parseInt(data[1]) : 1;
        const diceSize = parseInt(data[2]);
        const shouldExplode = !!data[3];
        const explodeValue = data[4] ? parseInt(data[4]) : diceSize;

        const rolls: (number | number[])[] = [];
        let total = 0;

        for (let i = 0; i < diceCount; i++) {
            let roll = this.randomIntMax(diceSize);
            const values = [roll];

            while (shouldExplode && roll >= explodeValue) {
                roll = this.randomIntMax(diceSize);
                values.push(roll);
            }

            rolls.push(values.length === 1 ? values[0] : values);
            total += values.reduce((a, b) => a + b, 0);
        }
        let rollsTexts = JSON.stringify(rolls).replace(/,/g, ", ").replace(/"/g, "");
        return {value: total, details: isSingle ? (Number(rollsTexts) === total ? undefined : rollsTexts) : rollsTexts};
    }

    static randomIntMax(max: number): number {
        return Math.floor(Math.random() * max) + 1;
    }
}