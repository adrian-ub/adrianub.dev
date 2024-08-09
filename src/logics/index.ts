import dayjs from "dayjs";
import "dayjs/locale/es";

export function formatDate(d: string | Date, onlyDate = true) {
	const date = dayjs(d, {
		locale: "es",
	});
	if (onlyDate || date.year() === dayjs().year()) return date.format("MMM D");
	return date.format("MMM D, YYYY");
}
