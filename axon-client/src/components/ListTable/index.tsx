import React from "react";
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "carbon-components-react";
import "./style.scss";
import OptionsMenu from "../OptionsMenu";
import { useNavigate } from "react-router-dom";

export interface ListDataProps {
  data: Array<string | undefined>;
  actions: boolean;
  link: string;
}

interface ListTableProps {
  header: Array<String>;
  body: Array<ListDataProps>;
}

const ListTable: React.FC<ListTableProps> = (props) => {
  const navigate = useNavigate();
  return (
    <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListHead>
        <StructuredListRow
          head
          tabIndex={0}
          className="structured-list-head-overides"
        >
          {props.header.map((header_label, index) => (
            <StructuredListCell
              head
              className="structured-list-cell-overides"
              key={index}
            >
              {header_label}
            </StructuredListCell>
          ))}
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {props.body.map((data, index) => (
          <StructuredListRow
            tabIndex={index}
            key={index}
            className="structured-list-row-overides"
          >
            {data.data.map((item, index) => (
              <StructuredListCell
                key={index}
                noWrap={true}
                className="structured-list-cell-overides"
                onClick={() => navigate(data.link)}
              >
                {`${item}`.slice(0, 50)}
                {item && item.length > 50 ? "..." : ""}
              </StructuredListCell>
            ))}

            {data.actions && (
              <StructuredListCell
                noWrap={true}
                className="structured-list-cell-overides"
              >
                <OptionsMenu />
              </StructuredListCell>
            )}
          </StructuredListRow>
        ))}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

export default ListTable;
