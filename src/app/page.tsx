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
  // Local API:
  // const result = await fetch(
  //   'http://localhost:4000/mtgcards'
  // );

  // Remote mock API
  const result = await fetch(
    'https://jsonserver-with-mockdata.vercel.app/mtgcards'
  );

  // delay response to show skeleton ux
  await new Promise(resolve => setTimeout(resolve, 1500));

  return result.json();
}

export default async function Home() {
  const mtgcards = await getMTGcards();

  return (
    <main>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-8'>
        {mtgcards.map(mtgcard => (
          <Card
            key={mtgcard.id}
            className='flex flex-col justify-between from-red-50 to-blue-100 bg-gradient-to-bl via-white min-w-500'
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
                <CardDescription></CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex gap-2 items-center justify-start pb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-full text-white border-0 border-zinc-300 text-center  text-bold text-sm bg-gradient-to-r from-blue-800 to-orange-700 via-green-700 animate-gradient-x'>
                  {mtgcard.manacost}
                </div>{' '}
                <div className='text-zinc-500'>mana to cast.</div>
              </div>
              <p>{mtgcard.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
              <Button>View Card</Button>
              {mtgcard.reservedlist && <Badge variant='outline'>Banned</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
