import { NewStudentCard } from '@/components/molecules/new-student-card';
import { StudentInfoCard } from '@/components/molecules/student-info-card';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export interface StudyStudent {
  id: string;
  name: string;
  weeks: string;
}

interface StudyStudentsCarouselProps {
  students: StudyStudent[];
  onNewStudent: () => void;
  onStudentPress?: (student: StudyStudent) => void;
}

export function StudyStudentsCarousel({
  students,
  onNewStudent,
  onStudentPress,
}: StudyStudentsCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <NewStudentCard onPress={onNewStudent} />
      {students.map((student) => (
        <StudentInfoCard
          key={student.id}
          name={student.name}
          weeks={student.weeks}
          onPress={onStudentPress ? () => onStudentPress(student) : undefined}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingVertical: 16,
  },
});
