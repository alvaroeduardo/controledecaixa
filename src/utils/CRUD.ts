import { PrismaClient } from '@prisma/client';

class CRUDService<T> {
 constructor(private prisma: PrismaClient, private model: keyof PrismaClient) {}

 async create(data: T): Promise<T> {
    try {
        const result = await (this.prisma[this.model] as any).create({ data });
        console.log('Data created successfully!');
        return result;
    } catch (error) {
        console.error('Failed to create data:', error);
        throw error;
    }
 }

 async read(id: string): Promise<T | null> {
    try {
        const idInt = parseInt(id)
        
        const result = await (this.prisma[this.model] as any).findUnique({ where: { id: idInt } });
        console.log('Data read successfully!');
        return result;
    } catch (error) {
        console.error('Failed to read data:', error);
        throw error;
    }
 }

 async getAll(): Promise<T>{
    try {
        const result = await (this.prisma[this.model] as any).findMany()
        return result
    } catch (error) {
        console.error('Failed to read data:', error);
        throw error;
    }
 }

 async update(id: string, data: Partial<T>): Promise<T> {
    try {
        const idInt = parseInt(id)

        const result = await (this.prisma[this.model] as any).update({ where: { id: idInt }, data });
        console.log('Data updated successfully!');
        return result;
    } catch (error) {
        console.error('Failed to update data:', error);
        throw error;
    }
 }

 async delete(id: string): Promise<T> {
    try {
        const idInt = parseInt(id)

        const result = await (this.prisma[this.model] as any).delete({ where: { id: idInt } });
        console.log('Data deleted successfully!');
        return result;
    } catch (error) {
        console.error('Failed to delete data:', error);
        throw error;
    }
 }
}

export default CRUDService;