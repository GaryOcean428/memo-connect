
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferralFormEmbed } from "@/components/referrals/ReferralFormEmbed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const ReferralEmbed = () => {
  const [recipientEmail, setRecipientEmail] = useState("agent@example.com");
  const [embedCode, setEmbedCode] = useState("");
  
  const generateEmbedCode = () => {
    const code = `<iframe 
  src="https://yourapp.com/referral-embed?recipient=${encodeURIComponent(recipientEmail)}" 
  width="100%" 
  height="700px" 
  style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" 
  title="Referral Form"
></iframe>`;
    
    setEmbedCode(code);
  };

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Referral Embedding</h1>
              <p className="text-muted-foreground">Create and embed referral forms for your partners and clients</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generate Embed Code</CardTitle>
                  <CardDescription>
                    Create an embeddable referral form with your email pre-filled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Email</label>
                      <Input 
                        type="email" 
                        value={recipientEmail} 
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="Enter your email address"
                      />
                      <p className="text-sm text-muted-foreground">
                        This email will be pre-filled as the recipient of the referral
                      </p>
                    </div>
                    
                    <Button onClick={generateEmbedCode} className="w-full">
                      Generate Embed Code
                    </Button>
                    
                    {embedCode && (
                      <div className="space-y-2 mt-4">
                        <label className="text-sm font-medium">Your Embed Code</label>
                        <div className="relative">
                          <textarea 
                            className="w-full h-24 p-3 text-sm font-mono bg-muted border rounded-md"
                            value={embedCode}
                            readOnly
                          />
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              navigator.clipboard.writeText(embedCode);
                              alert("Copied to clipboard!");
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add this code to your website where you want the form to appear
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">How it works</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Enter your email address above</li>
                  <li>Generate the embed code</li>
                  <li>Copy the code and add it to your website or application</li>
                  <li>When someone fills out the form, you'll receive the referral in your dashboard</li>
                </ol>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Referral Form Preview</h3>
              <div className="border rounded-lg overflow-hidden">
                <ReferralFormEmbed recipientEmail={recipientEmail} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </PageTransition>
  );
};

export default ReferralEmbed;
