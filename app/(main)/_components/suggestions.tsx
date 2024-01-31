import { Button } from "@/components/ui/button";

const SuggestionCard = ({ main, sec }: { main?: string; sec?: string }) => {
  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className="flex flex-col text-start items-start px-2 w-full py-2 h-fit border border-muted-foreground/20"
    >
      <p className="font-bold">{main}</p>
      <p className="text-xs text-muted-foreground truncate">{sec}</p>
    </Button>
  );
};

function Suggestions() {
  return (
    <div className="w-full flex items-center justify-center mb-36 md:mb-12 ">
      <div className="max-w-[550px] min-w-[350px] w-full h-32 relative gap-y-3 flex flex-col md:p-0 px-8">
        <div className="md:absolute top-0 left-0 md:w-[48%]">
          <SuggestionCard
            main="Give me ideas"
            sec="For what to do with my kids' art"
          />
        </div>
        <div className="md:absolute top-0 right-0 md:w-[48%]">
          <SuggestionCard
            main="Brainstorm ideas"
            sec="for my new podcast on urban design"
          />
        </div>
        <div className="md:absolute bottom-0 left-0 md:w-[48%]">
          <SuggestionCard
            main="Show me code snippets"
            sec="of a website's sticky header"
          />
        </div>
        <div className="md:absolute bottom-0 right-0 md:w-[48%]">
          <SuggestionCard
            main="Compare business strategies"
            sec="for a new startup"
          />
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
