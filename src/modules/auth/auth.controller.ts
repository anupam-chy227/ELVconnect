import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

export const registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerCustomer(req.body);
    res.status(201).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const registerServiceProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerServiceProvider(req.body);
    res.status(201).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deviceInfo = req.headers['user-agent'];
    const { user, accessToken, refreshToken } = await authService.login(req.body, deviceInfo);

    // Refresh token in HttpOnly cookie, access token in response body
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'No refresh token' },
      });
      return;
    }

    const { accessToken, refreshToken } = await authService.refreshAccessToken(incomingRefreshToken);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.status(200).json({ success: true, data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (req.user && refreshToken) {
      await authService.logout(req.user._id, refreshToken);
    }

    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).json({ success: true, data: { message: 'Logged out successfully' } });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resetToken = await authService.forgotPassword(req.body.email);
    // TODO: Send email with reset link containing resetToken
    // For now, return generic message (prevents enumeration)
    res.status(200).json({
      success: true,
      data: { message: 'If that email exists, a password reset link has been sent' },
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).json({
      success: true,
      data: { message: 'Password reset successfully. Please log in again.' },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { User } = await import('../users/user.model');
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
      return;
    }
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};
