interface QueryParamProps {
  query?: string;
  order?: string;
  filter?: string;
  day?: string;
  month?: string;
  year?: string;
  startDate?: string;
  endDate?: string;
  match?: string;
  fullDateMatch?: string;
}

export function getQuery(props: QueryParamProps) {
  const { query, order, filter, day, month, year, startDate, endDate, match, fullDateMatch } =
    props;
}
