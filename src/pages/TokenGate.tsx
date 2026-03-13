import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Page displayed when a valid token is missing or authentication fails.
 * In a real scenario, this would have a login form or instructions.
 */
const TokenGate = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
            <Lock className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">{t("auth.required")}</CardTitle>
          <CardDescription>
            {t("auth.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-6">
            {t("auth.instructions")}
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = window.location.origin + "/identity_journal/?token=demo-user-123"}
          >
            {t("auth.demo")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenGate;
