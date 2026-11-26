import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import InputField from './InputField.vue';

// ป้ายชื่อต้องผูกกับ <input> จริง เพื่อให้โปรแกรมอ่านหน้าจอรู้ชื่อช่อง และ Playwright ใช้ getByLabel ได้
let wrapper;
const render = (props) => {
    wrapper = mount(InputField, { props, attachTo: document.body });
    return wrapper;
};

afterEach(() => wrapper?.unmount());

describe('InputField accessibility', () => {
    it('labels the input with the label text', () => {
        const input = render({ label: 'วันเปิดภาคเรียน', type: 'date' }).get('input').element;

        expect(input.labels).toHaveLength(1);
        expect(input.labels[0].textContent.trim()).toBe('วันเปิดภาคเรียน');
    });

    it('gives each field on the same page its own id', () => {
        const Page = defineComponent({
            render: () => [h(InputField, { label: 'วันเปิดภาคเรียน' }), h(InputField, { label: 'กำหนดส่งรายงานของครู' })],
        });
        wrapper = mount(Page, { attachTo: document.body });

        const names = wrapper.findAll('input').map((i) => i.element.labels[0]?.textContent.trim());
        expect(names).toEqual(['วันเปิดภาคเรียน', 'กำหนดส่งรายงานของครู']);
    });

    it('describes the input with the hint text', () => {
        const input = render({ label: 'วันเปิดภาคเรียน', hint: 'ต้องเป็นวันในอนาคต' }).get('input').element;

        const ids = (input.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean);
        expect(ids).toHaveLength(1);
        expect(document.getElementById(ids[0])?.textContent.trim()).toBe('ต้องเป็นวันในอนาคต');
    });

    it('omits aria-describedby when there is no hint', () => {
        const input = render({ label: 'วันเปิดภาคเรียน' }).get('input');

        expect(input.attributes('aria-describedby')).toBeUndefined();
    });

    it('marks the input invalid only when destructive', () => {
        expect(render({ label: 'วันเปิดภาคเรียน', destructive: true }).get('input').attributes('aria-invalid')).toBe('true');
        wrapper.unmount();
        expect(render({ label: 'วันเปิดภาคเรียน' }).get('input').attributes('aria-invalid')).toBeUndefined();
    });
});
