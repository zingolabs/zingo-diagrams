import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handle, Position, type Node } from '@xyflow/react';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

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
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
            <Card style={{...data.style, width: 300}}> 
                <CardHeader>
                    <CardTitle>{data.label}</CardTitle>
                    <CardDescription>{data.description ?? 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <a href={data.gh_issue_url} target='_blank'>
                            <Button size={'sm'} variant={"default"} disabled={!data.gh_issue_url} >
                                <div className="flex gap-1 place-items-center">
                                    <Icons.gitHub style={{ height: '1em', width: '1em' }} />
                                    <span>Issue</span>
                                </div>
                            </Button>
                        </a>
                        <a href={data.kb_url} target='_blank'>
                            <Button size={'sm'} variant={"outline"} disabled={!data.kb_url}>
                                <div className="flex gap-1 place-items-center">
                                    <Icons.wiki style={{ height: '1em', width: '1em' }} />
                                    <span>Wiki</span>
                                </div>
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}