import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import invoiceRoutes from './modules/invoices/invoice.routes';
import jobRoutes from './modules/jobs/job.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/jobs', jobRoutes);

export default router;
