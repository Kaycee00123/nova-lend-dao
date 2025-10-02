import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Download, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const handleExportData = () => {
    toast.success("Transaction history exported successfully!");
  };

  const handleNotificationToggle = (checked: boolean) => {
    toast.info(checked ? "Notifications enabled" : "Notifications disabled");
  };

  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Notifications */}
        <Card className="p-6 bg-card border-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how you receive updates about your positions
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="health-alerts" className="text-base font-medium">
                      Health Factor Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your health factor drops below 1.5
                    </p>
                  </div>
                  <Switch
                    id="health-alerts"
                    defaultChecked
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="liquidation-alerts" className="text-base font-medium">
                      Liquidation Warnings
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Critical alerts when approaching liquidation threshold
                    </p>
                  </div>
                  <Switch
                    id="liquidation-alerts"
                    defaultChecked
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="reward-alerts" className="text-base font-medium">
                      Reward Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Updates on PROTO rewards and farming yields
                    </p>
                  </div>
                  <Switch
                    id="reward-alerts"
                    defaultChecked
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="governance-alerts" className="text-base font-medium">
                      Governance Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      New proposals and voting reminders
                    </p>
                  </div>
                  <Switch
                    id="governance-alerts"
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Export */}
        <Card className="p-6 bg-card border-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground">
                  Download your transaction history and account data
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="border-primary/20 hover:border-primary/40"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Transaction History
                </Button>
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="border-primary/20 hover:border-primary/40"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tax Report
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 bg-card border-primary/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your security and privacy settings
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="transaction-signing" className="text-base font-medium">
                      Transaction Signing
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require confirmation for all transactions
                    </p>
                  </div>
                  <Switch
                    id="transaction-signing"
                    defaultChecked
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-1">
                    <Label htmlFor="privacy-mode" className="text-base font-medium">
                      Privacy Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Hide wallet balance in public views
                    </p>
                  </div>
                  <Switch
                    id="privacy-mode"
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Warning */}
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Important Security Notice</p>
              <p className="text-sm text-muted-foreground">
                NovaLend will never ask for your private keys or seed phrase. Always verify transaction details before signing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
