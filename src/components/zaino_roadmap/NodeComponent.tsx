import { Handle, Position } from "@xyflow/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Icons } from "../ui/icons";
import type { WrappedNode } from "./Canvas";

type Props = {
  data: WrappedNode["data"];
};

export default function NodeComponent({ data }: Props) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Card style={{ ...data.style, width: 300, height: 250 }}>
        <CardHeader>
          <CardTitle>{data.id}</CardTitle>
          <CardDescription className="text-md">
            {data.description ?? "-"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <a href={data.gh_issue_url} target="_blank">
              <Button
                size={"sm"}
                variant={"default"}
                disabled={!data.gh_issue_url}
              >
                <div className="flex gap-1 place-items-center">
                  <Icons.gitHub style={{ height: "1em", width: "1em" }} />
                  <span>Issue</span>
                </div>
              </Button>
            </a>
            {/* <a href={data.kb_url} target="_blank">
              <Button size={"sm"} variant={"outline"} disabled={!data.kb_url}>
                <div className="flex gap-1 place-items-center">
                  <Icons.wiki style={{ height: "1em", width: "1em" }} />
                  <span>Wiki</span>
                </div>
              </Button>
            </a> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
