import { IconSymbol } from '@/components/atoms/icon-symbol';
import { GoalProgressRow } from '@/components/molecules/goal-progress-row';
import React from 'react';
import { View } from 'react-native';

export interface GoalItem {
  id: string;
  title: string;
  iconName: React.ComponentProps<typeof IconSymbol>['name'];
  currentValue: number;
  totalValue: number;
}

interface GoalsListProps {
  goals: GoalItem[];
}

export function GoalsList({ goals }: GoalsListProps) {
  return (
    <View style={{ width: '100%' }}>
      {goals.map((goal) => (
        <GoalProgressRow 
          key={goal.id}
          title={goal.title}
          iconName={goal.iconName}
          currentValue={goal.currentValue}
          totalValue={goal.totalValue}
        />
      ))}
    </View>
  );
}