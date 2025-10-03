import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useGovernance } from "@/hooks/useContracts";
import { useAccount } from "wagmi";

const proposals = [
  {
    id: 1,
    title: "Increase ETH Collateral Factor to 80%",
    description: "Proposal to increase the maximum borrowing power against ETH collateral from 75% to 80%.",
    status: "active",
    votesFor: 1245000,
    votesAgainst: 234000,
    totalVotes: 1479000,
    endTime: "2 days",
    category: "Risk Parameters",
  },
  {
    id: 2,
    title: "Launch PROTO Buyback Program",
    description: "Allocate 10% of protocol revenue to buy back and burn PROTO tokens quarterly.",
    status: "active",
    votesFor: 2100000,
    votesAgainst: 450000,
    totalVotes: 2550000,
    endTime: "5 days",
    category: "Treasury",
  },
  {
    id: 3,
    title: "Add Support for wBTC as Collateral",
    description: "Enable wrapped Bitcoin as an accepted collateral asset with 75% collateral factor.",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    endTime: "Starts in 1 day",
    category: "New Asset",
  },
  {
    id: 4,
    title: "Reduce Flash Loan Fee to 0.05%",
    description: "Lower the flash loan fee from 0.09% to 0.05% to increase competitiveness.",
    status: "passed",
    votesFor: 1850000,
    votesAgainst: 320000,
    totalVotes: 2170000,
    endTime: "Executed",
    category: "Fee Adjustment",
  },
];

export default function Govern() {
  const { address, isConnected } = useAccount();
  const { vote, votingPower } = useGovernance();
  const [isVoting, setIsVoting] = useState(false);
  const protoBalance = 142.8;

  const handleVote = async (proposalId: number, voteFor: "for" | "against") => {
    if (!isConnected) {
      toast.error("Please connect your wallet to vote");
      return;
    }
    
    setIsVoting(true);
    try {
      await vote(proposalId, voteFor === "for");
      toast.success(`Voted ${voteFor === "for" ? "FOR" : "AGAINST"} on proposal #${proposalId}!`);
    } catch (error) {
      console.error("Vote error:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "passed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8 pt-4">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Governance</h1>
            <p className="text-muted-foreground">Vote on proposals and shape NovaLend's future</p>
          </div>
          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <Vote className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Your Voting Power</p>
                <p className="text-2xl font-bold text-primary">
                  {isConnected ? `${parseFloat(votingPower).toFixed(2)} PROTO` : '0 PROTO'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Voting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Active Proposals</p>
            <p className="text-2xl font-bold text-primary">2</p>
          </Card>
          <Card className="p-4 bg-card border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Total Proposals</p>
            <p className="text-2xl font-bold text-foreground">4</p>
          </Card>
          <Card className="p-4 bg-card border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Your PROTO</p>
            <p className="text-2xl font-bold text-primary">{protoBalance}</p>
          </Card>
          <Card className="p-4 bg-card border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">Participation Rate</p>
            <p className="text-2xl font-bold text-foreground">68%</p>
          </Card>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">All Proposals</h2>
          
          {proposals.map((proposal) => {
            const forPercentage = proposal.totalVotes > 0 
              ? (proposal.votesFor / proposal.totalVotes) * 100 
              : 0;
            const againstPercentage = proposal.totalVotes > 0 
              ? (proposal.votesAgainst / proposal.totalVotes) * 100 
              : 0;

            return (
              <Card
                key={proposal.id}
                className="p-6 bg-card border-primary/10 hover:border-primary/20 transition-all"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(proposal.status)}
                        >
                          {proposal.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary border-secondary">
                          {proposal.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {proposal.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {proposal.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{proposal.endTime}</span>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  {proposal.totalVotes > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">For</span>
                          <span className="font-semibold text-primary">
                            {forPercentage.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {proposal.votesFor.toLocaleString()} PROTO
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary glow-primary transition-all"
                          style={{ width: `${forPercentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-destructive" />
                          <span className="text-muted-foreground">Against</span>
                          <span className="font-semibold text-destructive">
                            {againstPercentage.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {proposal.votesAgainst.toLocaleString()} PROTO
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Voting Buttons */}
                  {proposal.status === "active" && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={!isConnected || isVoting}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {isVoting ? "Voting..." : "Vote For"}
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={!isConnected || isVoting}
                        variant="outline"
                        className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {isVoting ? "Voting..." : "Vote Against"}
                      </Button>
                    </div>
                  )}

                  {proposal.status === "pending" && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      Voting has not started yet
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-card border-primary/10">
          <h3 className="text-xl font-bold text-foreground mb-4">How Governance Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-foreground">Stake PROTO</h4>
              <p className="text-sm text-muted-foreground">
                Hold or stake PROTO tokens to gain voting power in governance decisions
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-foreground">Review Proposals</h4>
              <p className="text-sm text-muted-foreground">
                Read through active proposals and their potential impact on the protocol
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-foreground">Cast Your Vote</h4>
              <p className="text-sm text-muted-foreground">
                Vote for or against proposals. Votes are weighted by your PROTO holdings
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
