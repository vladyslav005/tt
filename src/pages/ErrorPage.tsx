import {useRouteError} from "react-router-dom";
import {Card, CardContent, CardFooter} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";

export function ErrorPage() {
  const error = useRouteError();

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }
    if (
      typeof error === "object" &&
      error !== null &&
      "statusText" in error &&
      typeof (error as any).statusText === "string"
    ) {
      return (error as any).statusText;
    }
    return "An unexpected error occurred.";
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md border">
        <CardContent className="text-center">
          <h3 className="mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-muted-foreground">
            {getErrorMessage(error)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </CardFooter>
      </Card>
    </div>
  );
}