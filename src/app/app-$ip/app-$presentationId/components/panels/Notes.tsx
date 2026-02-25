import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "@/core";
import { Container, Header, Tab, NotesTextarea } from "./index.css";

export type NotesPanelProps = {
	notes: string;
	slideId: string | undefined;
	onSaveNotes: (slideId: string, notes: string) => void;
};

export function NotesPanel({ notes, slideId, onSaveNotes }: NotesPanelProps) {
	const { t } = useTranslation();
	const [localNotes, setLocalNotes] = useState(notes);
	const [isSaving, setIsSaving] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		setLocalNotes(notes);
	}, [notes]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const value = e.target.value;
			setLocalNotes(value);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			setIsSaving(true);
			timeoutRef.current = window.setTimeout(() => {
				if (slideId) {
					onSaveNotes(slideId, value);
				}
				setIsSaving(false);
			}, 500);
		},
		[slideId, onSaveNotes],
	);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<Container>
			<Header>
				<Tab $active type="button">
					{t`presentationNotes`}
				</Tab>
				{isSaving && <span>{t`presentationNotesSaving`}</span>}
			</Header>
			<NotesTextarea value={localNotes} onChange={handleChange} placeholder={t`presentationNotesPlaceholder`} />
		</Container>
	);
}
