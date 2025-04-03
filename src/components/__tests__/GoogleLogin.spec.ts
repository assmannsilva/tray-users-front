import { mount } from '@vue/test-utils';
import { it, expect, vi } from 'vitest';
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { googleAuthService } from '@/services/googleAuth.service';

vi.mock('@/services/googleAuth.service', () => ({
    googleAuthService: {
        signIn: vi.fn()
    }
}));

it('opens new window when auth_url is returned', async () => {
    global.open = vi.fn();

    vi.mocked(googleAuthService.signIn).mockResolvedValueOnce({
        success: true,
        data: { auth_url: 'https://google.com' }
    });

    const wrapper = mount(GoogleLoginButton);
    await wrapper.find('button').trigger('click');

    expect(global.open).toHaveBeenCalledWith('https://google.com');
});
