import './cell-list.css';
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderedCell = cells.map(cell =>
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellid={cell.id} />
        </Fragment>
    )

    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} previousCellid={null} />
            {renderedCell}
        </div>);
}

export default CellList;