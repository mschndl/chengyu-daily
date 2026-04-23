'use client';

import { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from './ui/button';

type Props = { text: string };

export function SpeakButton({ text }: Props) {
    const [speaking, setSpeaking] = useState(false);

    const speak = () => {
        if (!('speechSynthesis' in window)) return;

        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1;

        const voices = window.speechSynthesis.getVoices();
        const chineseVoice = voices.find(
            v => v.lang.startsWith('zh') || v.lang.startsWith('cmn'),
        );
        if (chineseVoice) utterance.voice = chineseVoice;

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    return (
        <Button
            variant={speaking ? 'default' : 'outline'}
            size="icon"
            onClick={speak}
            title={speaking ? 'Stop' : 'Listen to pronunciation'}
        >
            {speaking ? <Square size={14} /> : <Volume2 size={14} />}
        </Button>
    );
}