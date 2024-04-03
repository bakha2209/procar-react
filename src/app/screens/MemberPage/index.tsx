import { Container } from "@mui/material";
import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { VisitOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  let member = useRouteMatch();
  const {verifiedMemberData} = props
  const query = useQuery();
  const chosen_mb_id: string|null=query.get("mb_id") ?? null
  const chosen_art_id: string|null = query.get("art_id") ?? null
  console.log(member);
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage verifiedMemberData={verifiedMemberData} />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage verifiedMemberData={verifiedMemberData} />
        </Route>
      </Switch>
    </div>
  );
}
