import "./add-cell.css";
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
    previousCellid: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellid, forceVisible }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfter(previousCellid, "code")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button className="button is-rounded is-primary is-small"
                    onClick={() => insertCellAfter(previousCellid, "text")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divdier"></div>
        </div>
    );
}

export default AddCell;
