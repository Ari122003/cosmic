'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ColorfulCards() {
  const cards = [
    { title: "Card 1", description: "This is the first card", color: "#A779F8" },
    { title: "Card 2", description: "This is the second card", color: "#6583F7" },
    { title: "Card 3", description: "This is the third card", color: "#A779F8" },
  ]

  return (
    (<div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {cards.map((card, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <CardContent
              className="p-2 sm:p-4 text-white flex-grow"
              style={{ backgroundColor: card.color }}>
              <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{card.title}</h2>
              <p className="text-xs sm:text-sm">{card.description}</p>
            </CardContent>
            <CardFooter className="bg-white p-2 sm:p-4 flex justify-end">
              <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>)
  );
}