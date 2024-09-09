import { useCallback } from 'react';
import { Handle, Position, type Node } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const handleStyle = { left: 10 };

type BaseDataType = {
    label: string;
    description?: string;
    style: Node['style'];
    kb_url?: string;
    gh_issue_url?: string;
};

type Props<T extends BaseDataType> = {
    data: Node<T>['data'],
}

export default function BaseCustomNode<T extends BaseDataType>({ data }: Props<T>) {

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Card style={data.style}>
                <CardHeader>
                    <CardTitle>{data.label}</CardTitle>
                    <CardDescription>{data.description ?? 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <a href={data.gh_issue_url}>
                            <Button variant={"default"} disabled={!data.gh_issue_url}>Issue</Button>
                        </a>
                        <a href={data.kb_url}>
                            <Button variant={"outline"} disabled={!data.kb_url}>KB entry</Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}