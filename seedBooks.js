import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://zsmipfqgxgnnuniqtmkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbWlwZnFneGdubnVuaXF0bWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODU4MTksImV4cCI6MjA4OTc2MTgxOX0.t-0tm39wUR4ZklpNasivOUYhkz7NkYB27pbsQNZLTwc';
const supabase = createClient(supabaseUrl, supabaseKey);

const booksDir = 'C:/Users/mmatc/OneDrive/Desktop/DuoKod/public/books/uzb';

async function seedBooks() {
    try {
        const files = fs.readdirSync(booksDir);
        
        for (const file of files) {
            if (file.endsWith('.pdf')) {
                const title = file.replace('.pdf', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                
                const { error } = await supabase.from('articles').insert([
                    {
                        title: title,
                        content: 'Bu foydali o\'quv qo\'llanmasidir. To\'g\'ridan-to\'g\'ri biriktirilgan PDF ni yuklab oling yoki o\'qing.',
                        file_url: `/books/uzb/${file}`,
                        author: 'Kutubxona'
                    }
                ]);
                
                if (error) {
                    console.error("Xatolik: " + title, error.message);
                } else {
                    console.log("Qo'shildi: " + title);
                }
            }
        }
        console.log("Barcha PDFlar bazaga muvaffaqiyatli kiritildi!");
    } catch (e) {
        console.error(e);
    }
}

seedBooks();
