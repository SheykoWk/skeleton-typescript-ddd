export type QuerySearch = {
	where?: { [key: string]: any };
	limit?: number;
	offset?: number;
	orderBy?: { field: string; direction: 'ASC' | 'DESC' };
};
