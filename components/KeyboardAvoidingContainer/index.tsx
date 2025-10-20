import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps } from 'react-native';

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
  scrollViewProps?: ScrollViewProps;
}

export function KeyboardAvoidingContainer({
  children,
  scrollViewProps,
}: KeyboardAvoidingContainerProps) {
  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        {...scrollViewProps}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
