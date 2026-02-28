import {AlertCircle, FileQuestionMark} from 'lucide-react';

export function NotFoundPage() {

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Water Droplet Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"/>
            <div className="relative w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <FileQuestionMark className="w-16 h-16 text-primary animate-bounce"/>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-bold text-foreground tracking-tight">
            404
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground">
            Page Not Found
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Looks like this page is not correctly typed.
        </p>

        {/* Help Message */}
        <div className="pt-8 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4"/>
            <span>
              Need help? Contact{' '}
              <a href="mailto:support@aquaphage.com" className="text-primary hover:underline">
                support@aquaphage.com
              </a>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}