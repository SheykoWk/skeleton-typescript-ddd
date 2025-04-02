export abstract class HashService {
	abstract compare(raw: string, hash: string): boolean;
	abstract hash(password: string): string;
}
