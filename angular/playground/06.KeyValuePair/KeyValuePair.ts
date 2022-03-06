export class KeyValuePair<K, V> {
    private key: K;
    private value: V;

    public setKeyValuePair(key: K, value: V): void {
        this.key = key;
        this.value = value;
    }

    public display(): void {
        console.log(`key = ${this.key}, value = ${this.value}`);
    }
}