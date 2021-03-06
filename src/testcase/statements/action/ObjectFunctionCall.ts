import {Statement} from "../Statement";
import {ActionStatement} from "../ActionStatement";
import {Constructor} from "./Constructor"
import {getProperty, prng, Sampler} from '../../../index'

/**
 * @author Dimitri Stallenberg
 */
export class ObjectFunctionCall extends ActionStatement {
    get functionName(): string {
        return this._functionName;
    }

    set functionName(value: string) {
        this._functionName = value;
    }

    private _functionName: string;

    /**
     * Constructor
     * @param instance the object to call the function on
     * @param functionName the name of the function
     * @param type the return type of the function
     * @param args the arguments of the function
     * @param uniqueId optional argument
     */
    constructor(instance: Constructor, functionName: string, type: string, uniqueId: string, args: Statement[]) {
        super(functionName, type, uniqueId, [instance, ...args])
        this._functionName = functionName
    }

    mutate(sampler: Sampler, depth: number) {
        if (prng.nextBoolean(getProperty("resample_gene_chance"))) {
            // resample the gene
            return sampler.sampleGene(depth, this.type, 'functionCall')
        } else if (!this.args.length) {
            return this.copy()
        } else {            // randomly pick one of the args
            let args = [...this.args.map((a: Statement) => a.copy())]
            let index = prng.nextInt(0, args.length - 1)
            args[index] = args[index].mutate(sampler, depth + 1)
            let instance = args.shift() as Constructor
            return new ObjectFunctionCall(instance, this._functionName, this.type, this.id, args)
        }
    }

    copy() {
        let deepCopyArgs = [...this.args.map((a: Statement) => a.copy())]
        let instance = deepCopyArgs.shift() as Constructor

        return new ObjectFunctionCall(instance, this._functionName, this.type, this.id, deepCopyArgs)
    }

    hasChildren(): boolean {
        return true
    }

    getChildren(): Statement[] {
        return [...this.args]
    }
}
