import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'weightChakraSpeEffectByAmount'
})
export class WeightChakraSpeEffectByAmountPipe implements PipeTransform {

    transform(effect: string, amount: number): string {
        const values = effect.matchAll(/{{(\d+)}}/gm);
        for (let value of new Set(Array.from(values).map(value => value[1]))) {
            effect = effect.replaceAll(`{{${value}}}`, `${(parseInt(value) * amount)}`);
        }
        return effect;
    }
}