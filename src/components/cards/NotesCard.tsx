import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Tag, Plus } from 'lucide-react';
import type { Note } from '@/types/dashboard';
import { getStoredNotes } from '@/lib/storage';

import { formatDistanceToNow } from 'date-fns';

interface NotesCardProps {
    onAddNoteClick?: () => void;
}

export const NotesCard: React.FC<NotesCardProps> = ({ onAddNoteClick }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Poll for changes in storage (quick hack for cross-component updates in this demo)
    useEffect(() => {
        const load = () => setNotes(getStoredNotes().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        load();

        // Listen for storage events or custom events if we implemented them
        // For now we just load on mount
        const interval = setInterval(load, 1000);
        return () => clearInterval(interval);
    }, []);

    const filteredNotes = notes.filter(n =>
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 space-y-2">
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Notes Timeline
                    </CardTitle>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onAddNoteClick}>
                        <Plus className="h-3 w-3 mr-1" /> Add Note
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        placeholder="Search notes..."
                        className="h-8 pl-8 text-xs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-6 pb-4">
                    <div className="space-y-6 pt-2">
                        {filteredNotes.map((note) => (
                            <div key={note.id} className="relative pl-6 pb-1 border-l border-border last:border-0">
                                <span className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-muted-foreground font-mono">
                                            {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <p className="text-sm leading-snug whitespace-pre-wrap">{note.content}</p>
                                    {note.tags && note.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {note.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] px-1 h-5 font-normal">
                                                    <Tag className="h-2 w-2 mr-1 opacity-70" /> {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {filteredNotes.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-xs">
                                {notes.length === 0 ? "No notes recorded." : "No matching notes."}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};
