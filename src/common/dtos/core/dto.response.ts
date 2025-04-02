export abstract class ResponseDto<T> {
	abstract build(data: any): T;

	send(): this {
		return this;
	}
}
