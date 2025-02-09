import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

export function useTable() {

	const tableRef = useRef(null);

    const { onDownload }: { onDownload: () => boolean } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Users table',
		sheet: 'Users',
	})
	return {
        tableRef,
        onDownload
	}
}