import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  const cards = [
    { title: "Card 1", description: "This is the first card", color: "#A779F8" },
    { title: "Card 2", description: "This is the second card", color: "#6583F7" },
    { title: "Card 3", description: "This is the third card", color: "#A779F8" },
  ]

  return (
    <div className="min-h-screen  p-2 sm:p-4 flex items-center">
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-4">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className="overflow-hidden"
            style={{ backgroundColor: card.color }}
          >
            <CardContent className="p-3 sm:p-5 text-white flex flex-col h-full justify-between">
              <div>
                <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{card.title}</h2>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4">{card.description}</p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs sm:text-sm but mx-20 h-10 sm:w-auto"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}