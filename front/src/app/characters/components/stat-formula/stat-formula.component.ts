import {Component, computed, input} from '@angular/core';
import {StatFormulaItemComponent} from "../stat-formula-item/stat-formula-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-stat-formula',
  standalone: true,
    imports: [
        StatFormulaItemComponent,
        NgForOf
    ],
  templateUrl: './stat-formula.component.html',
  styleUrl: './stat-formula.component.scss'
})
export class StatFormulaComponent {

    data = input.required<Formula>();
    flattenedData = computed(() => this.flatten(this.data()));
    equals = Operator.EQUALS;
    result = computed(() => this.data().result);

    flatten(data: Formula): FormulaItem[] {
        const result = [];
        for (const item of data.items) {
            if (item.type === 'formula') {
                result.push(Operator.OPEN_PARENTHESIS);
                result.push(...this.flatten(item as Formula));
                result.push(Operator.CLOSE_PARENTHESIS);
            } else {
                result.push(item);
            }
        }
        return result;
    }
}

export interface FormulaItem {
    value: string;
    descriptor?: string;
    readonly type: 'formula' | 'operator' | 'constant' | 'variable';
}

export class Formula implements FormulaItem {
    items: FormulaItem[];
    descriptor: string;
    result: Variable | Constant;
    value: string;
    readonly type = 'formula';


    constructor(name: string, ...items: FormulaItem[]) {
        this.descriptor = name;
        this.items = items;
        this.result = this._result();
        this.value = this.result.value; //TODO add a way to take variables as parameters when calculating the result (to be able to reuse the formula instead of creating a new one for each character)
    }

    private _result(): Variable | Constant {
        let result = 0;
        let operator = Operator.PLUS;

        for (const item of this.items) {
            if (item.type === 'operator') {
                operator = item as Operator;
            } else {
                const value = item as Constant;
                switch (operator) {
                    case Operator.PLUS:
                        result += Number(value.value);
                        break;
                    case Operator.MINUS:
                        result -= Number(value.value);
                        break;
                    case Operator.TIMES:
                        result *= Number(value.value);
                        break;
                    case Operator.DIVIDE:
                        result /= Number(value.value);
                        break;
                    default:
                        throw new Error('Unknown operator: ' + operator.value);
                }
            }
        }
        if (this.items.map(i => i.type === "formula" ? (i as Formula).result.type : i.type).includes('variable')) {
            return new Variable(result, this.descriptor);
        } else {
            return new Constant(result, this.descriptor);
        }
    }
}

export class Operator implements FormulaItem {
    value = this.operator;
    descriptor = undefined;
    readonly type = 'operator';

    private constructor(public operator: string) {}

    static PLUS = new Operator('+');
    static MINUS = new Operator('-');
    static TIMES = new Operator('×');
    static DIVIDE = new Operator('/');
    static EQUALS = new Operator('=');
    static OPEN_PARENTHESIS = new Operator('(');
    static CLOSE_PARENTHESIS = new Operator(')');
}

export class Constant implements FormulaItem {
    value: string;
    descriptor: string;
    readonly type = 'constant';

    constructor(value: number, descriptor: string) {
        this.value = value.toString();
        this.descriptor = descriptor;
    }
}

export class Variable implements FormulaItem {
    value: string;
    descriptor: string;
    readonly type = 'variable';

    constructor(value: number, descriptor: string) {
        this.value = value.toString();
        this.descriptor = descriptor;
    }
}