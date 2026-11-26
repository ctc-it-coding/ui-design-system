import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Toggle from './Toggle.vue';

// สวิตช์ (role="switch") ต้องได้ชื่อจากข้อความ label และคำอธิบายจาก supporting text
let wrapper;
const render = (options) => {
    wrapper = mount(Toggle, { ...options, attachTo: document.body });
    return wrapper.get('[role="switch"]');
};
const textOf = (ids) => (ids ?? '').split(' ').filter(Boolean).map((id) => document.getElementById(id)?.textContent.trim());

afterEach(() => wrapper?.unmount());

describe('Toggle accessibility', () => {
    it('names the switch with the label text only', () => {
        const sw = render({ props: { label: 'เปิดให้ครูรายงานสถานะ', supportingText: 'ปิดแล้วครูดูได้อย่างเดียว แก้ไม่ได้' } });

        expect(textOf(sw.attributes('aria-labelledby'))).toEqual(['เปิดให้ครูรายงานสถานะ']);
    });

    it('describes the switch with the supporting text', () => {
        const sw = render({ props: { label: 'เปิดให้ครูรายงานสถานะ', supportingText: 'ปิดแล้วครูดูได้อย่างเดียว แก้ไม่ได้' } });

        expect(textOf(sw.attributes('aria-describedby'))).toEqual(['ปิดแล้วครูดูได้อย่างเดียว แก้ไม่ได้']);
    });

    it('names the switch from the default slot', () => {
        const sw = render({ slots: { default: 'ส่งเตือนครู' } });

        expect(textOf(sw.attributes('aria-labelledby'))).toEqual(['ส่งเตือนครู']);
    });

    it('omits label and description references when there is no text', () => {
        const sw = render({ props: {} });

        expect(sw.attributes('aria-labelledby')).toBeUndefined();
        expect(sw.attributes('aria-describedby')).toBeUndefined();
    });
});
