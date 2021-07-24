import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    const renderedCell = cells.map(cell =>
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellid={cell.id} />
        </Fragment>
    )

    return (
        <div>
            <AddCell forceVisible={cells.length === 0} previousCellid={null} />
            {renderedCell}
        </div>);
}

export default CellList;