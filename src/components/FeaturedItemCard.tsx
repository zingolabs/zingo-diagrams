import type { Item } from "@/data/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
    item: Item;
    className?: string;
}

export default function FeaturedItemCard({ item }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <a href={item.href}>
                    <Button variant={"default"}>View</Button>
                </a>
            </CardContent>
        </Card>
    )
}