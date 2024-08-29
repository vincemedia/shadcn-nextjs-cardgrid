import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MTGcards {
  title: string;
  image: string;
  manacost: number;
  description: string;
  reservedlist: boolean;
  id: string;
}

async function getMTGcards(): Promise<MTGcards[]> {
  const result = await fetch('http://localhost:4000/mtgcards');

  // delay response to show skeleton ux
  await new Promise(resolve => setTimeout(resolve, 2000));

  return result.json();
}

export default async function Home() {
  const mtgcards = await getMTGcards();

  return (
    <main>
      <div className='grid grid-cols-3 gap-8'>
        {mtgcards.map(mtgcard => (
          <Card
            key={mtgcard.id}
            className='flex flex-col justify-between  from-red-50 to-blue-100 bg-gradient-to-bl via-white '
          >
            <CardHeader className='flex-row gap-4 items-center'>
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>{mtgcard.title.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div>
                <CardTitle>{mtgcard.title}</CardTitle>
                <CardDescription>
                  {mtgcard.manacost} mana to put into play.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{mtgcard.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
              <Button>View Card</Button>
              {mtgcard.reservedlist && (
                <Badge variant='outline'>Reserved list</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
